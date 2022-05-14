const BD_FE_CLASSNAME = 'data-bd-fe-classname';
const BD_FE_ID = 'data-bd-fe-id';
const BD_FE_COMPONENT = 'data-bd-fe-component';
const BD_FE_PARAM = '_bd_fe_param'; // dummy param
const CLASSNAME = 'className';
const STYLES = 'styles';
const TESTID_PROP = '_bd_fe_testid'; // dummy prop for component
const REACT_FRAGMENT = 'React.Fragment';
const ID_ATTRIBUTE_KEY_LIST = [
  'title',
  'label',
  'placeholder',
  'description',
  'header',
  'name',
  'field',
  'type',
];
const DELIMETER = '-';
const CAPITALISED_REGEX = /^[A-Z]/g;
const NON_ALPHANUMERIC_OR_UNDERSCORE_REGEX = /[^a-zA-Z0-9_]/g; // i18n keys contain _
const isCapitalised = str => str.match(CAPITALISED_REGEX) !== null;

module.exports = require('babel-loader').custom(babel => {
  /**
   * @example createAttributeLiteral(BD_FE_COMPONENT, 'ComponentName') -> data-bd-fe-component='ComponentName'
   * @param {string} key
   * @param {string} stringValue
   */
  function createAttributeLiteral(key, stringValue) {
    return babel.types.jsxAttribute(
      babel.types.jsxIdentifier(key),
      babel.types.stringLiteral(stringValue)
    );
  }

  /**
   * @example createAttributeIdentifier(BD_FE_ID, TESTID_PROP) -> data-bd-fe-id={testId}
   * @param {string} key
   * @param {string} indentifier
   */
  function createAttributeIdentifier(key, indentifier) {
    return babel.types.jsxAttribute(
      babel.types.jsxIdentifier(key),
      babel.types.jsxExpressionContainer(babel.types.identifier(indentifier))
    );
  }

  /**
   * @example createVariable(_a, testId) -> var testId = _a.testId
   * @param {identifier} parameterIdentifier
   * @param {string} key
   * @returns a variable declaration for a given identifier
   */
  function createVariable(parameterIdentifier, key) {
    return babel.types.variableDeclarator(
      babel.types.identifier(key),
      babel.types.optionalMemberExpression(
        parameterIdentifier, // object key
        babel.types.identifier(key), // object property
        false,
        true // optional
      )
    );
  }

  /**
   * @returns a variable declaration array with one variable
   */
  function createVariableDeclarationArray(parameterIdentifier, key) {
    return babel.types.variableDeclaration('var', [
      createVariable(parameterIdentifier, key),
    ]);
  }

  /**
   * @example getContentForArray([styles.a, styles.a, styles.b]) -> [a, b]
   * @param {node[]} nodeArray
   * @returns an array of unique content extracted from the node array
   */
  function getContentForArray(nodeArray) {
    return Array.from(
      new Set(nodeArray.map(getContent).filter(t => t.length > 0))
    );
  }

  /**
   * @example getContentStringForArray([styles.a, styles.a, styles.b]) -> a + DELIMITER + b
   * @param {node[]} nodeArray
   * @returns a string of unique content extracted from the node array joined by the delimiter
   */
  function getContentStringForArray(nodeArray) {
    return getContentForArray(nodeArray).join(DELIMETER);
  }

  /**
   * @param {node} node
   * @param {boolean} allowIdentifier
   * @returns the content of nodes based on their type
   */
  function getContent(node, allowIdentifier = false) {
    if (!node || !node.type) {
      return '';
    }
    switch (node.type) {
      case 'StringLiteral':
      case 'JSXText':
        return node.value.replace(NON_ALPHANUMERIC_OR_UNDERSCORE_REGEX, '');
      case 'MemberExpression':
        // styles.a or enum constants
        return node.object.name &&
          (node.object.name === STYLES ||
            node.object.name === node.object.name.toUpperCase())
          ? getContent(node.property, true)
          : getContent(node.property, allowIdentifier);
      case 'JSXMemberExpression':
        // React.Fragment
        return node.object.name + '.' + node.property.name;
      case 'Identifier':
        return allowIdentifier
          ? node.name.replace(NON_ALPHANUMERIC_OR_UNDERSCORE_REGEX, '')
          : '';
      case 'JSXIdentifier':
        return node.name.replace(NON_ALPHANUMERIC_OR_UNDERSCORE_REGEX, '');
      case 'JSXExpressionContainer':
        return getContent(node.expression, allowIdentifier);
      case 'ObjectProperty':
      case 'JSXAttribute':
        return getContent(node.value, allowIdentifier);
      case 'CallExpression':
        // cx(styles.a, styles.b)
        return getContentStringForArray(node.arguments);
      case 'ConditionalExpression':
        return getContentStringForArray([node.consequent, node.alternate]);
      case 'LogicalExpression':
      case 'BinaryExpression':
        // a + b
        return getContentStringForArray([node.left, node.right]);
      case 'ObjectExpression':
        /*
        header={{
            title: t('DASHBOARD_CURRENT_HVAC_EFFICIENCY'),
            link: { path: HvacPage.ChillerPlantMonitoring },
          }}
        */
        return getContentStringForArray(node.properties);
      default:
        // console.warn(node.type + ' not handled', node);
        return '';
    }
  }

  /**
   * @param {node} node
   * @returns the body node of the function declaration
   */
  function getMainFunctionBody(node) {
    if (!node) {
      return null;
    }
    if (babel.types.isCallExpression(node)) {
      //  React.memo(React.forwardRef())
      return getMainFunctionBody(node.arguments?.[0]);
    }
    if (babel.types.isFunctionExpression(node)) {
      return node.body?.body;
    }
    return null;
  }

  /**
   * @param {node} node
   * @returns the params array node of the function declaration
   */
  function getMainFunctionParameter(node) {
    if (!node) {
      return null;
    }
    if (babel.types.isCallExpression(node)) {
      //  React.memo(React.forwardRef())
      return getMainFunctionParameter(node.arguments?.[0]);
    }
    if (babel.types.isFunctionExpression(node)) {
      return node.params;
    }
    return null;
  }

  /**
   * Get first parameter identifier or add one if it doesn't exist
   * @param {node[]} currentParameters
   * @returns the first parameter identifier
   */
  function getParameterIdentifier(currentParameters) {
    const parameterIdentifier = currentParameters[0];
    if (!parameterIdentifier) {
      const newParam = babel.types.identifier(BD_FE_PARAM);
      currentParameters.push(newParam);
      return newParam;
    }
    return parameterIdentifier;
  }

  /**
   * Find the first node that is JSXElement, and add attributes and variable declarations
   * @param {node} element
   * @param {string} componentName
   * @param {node[]} currentParameters
   * @param {node} body
   */
  function addComponentAttribute(
    element,
    componentName,
    currentParameters,
    body
  ) {
    if (!element) {
      return;
    }

    if (babel.types.isJSXElement(element)) {
      // 1. Add component attribute
      const attributes = element.openingElement.attributes;
      const tagName = getContent(element.openingElement.name);
      if (isCapitalised(tagName)) {
        if (tagName.includes('.')) {
          // .Provicer wrapper or React.Fragment wrapper
          element.children?.forEach(child =>
            addComponentAttribute(child, componentName, currentParameters, body)
          );
        } else {
          // Component returns Component, so we add testId={testId}
          attributes.push(createAttributeIdentifier(TESTID_PROP, TESTID_PROP));
        }
      } else {
        // Only when it's HTML tag, we add component name attribute
        attributes.push(createAttributeLiteral(BD_FE_COMPONENT, componentName));
        // And add data-testid={testId}
        attributes.push(createAttributeIdentifier(BD_FE_ID, TESTID_PROP));
      }

      // 2. Add variable and parameter to body
      const parameterIdentifier = getParameterIdentifier(currentParameters);
      const variableDeclarationArray = body?.filter(s =>
        babel.types.isVariableDeclaration(s)
      );
      if (
        variableDeclarationArray.length === 0 ||
        parameterIdentifier.name === BD_FE_PARAM
      ) {
        // Add varible declaration to body if it doesn't exist
        body.push(
          createVariableDeclarationArray(parameterIdentifier, TESTID_PROP)
        );
      } else {
        // Find the variable declaration using the same parameter identifier
        const variableDeclaration = variableDeclarationArray.find(
          v =>
            v.declarations?.[0]?.init?.object?.name === parameterIdentifier.name
        );
        if (!variableDeclaration) {
          body.push(
            createVariableDeclarationArray(parameterIdentifier, TESTID_PROP)
          );
        } else {
          variableDeclaration.declarations.push(
            createVariable(parameterIdentifier, TESTID_PROP)
          );
        }
      }
    } else if (babel.types.isJSXFragment(element)) {
      // <><div/><span/></>
      element.children?.forEach(child =>
        addComponentAttribute(child, componentName, currentParameters, body)
      );
    } else if (babel.types.isJSXExpressionContainer(element)) {
      if (babel.types.isConditionalExpression(element.expression)) {
        // {a ? </> : null}
        addComponentAttribute(
          element.expression.consequent,
          componentName,
          currentParameters,
          body
        );
        addComponentAttribute(
          element.expression.alternate,
          componentName,
          currentParameters,
          body
        );
      } else if (babel.types.isLogicalExpression(element.expression)) {
        // {a && </>}
        addComponentAttribute(
          element.expression?.right,
          componentName,
          currentParameters,
          body
        );
      }
    }
  }

  /**
   * addTestAutomationAttributesPlugin is a custom babel plugin that adds
   * 1. BD_FE_CLASSNAME based on the className prop, i.e. className={cx(styles.deviceCard, styles.red)}
   * 2. BD_FE_ID based on any i18n key in these attributes (ID_ATTRIBUTE_KEY_LIST) or in the content of the element
   * 3. BD_FE_COMPONENT based on var or fn declaration, i.e. var DataDisplay = React.memo(React.forwardRef(function () {...}))
   * **Note**:
   * 1. We assume it is a user-defined component if the first letter is capitalised
   * 2. If it's a user-defined component, we add a variable declaration to the function, and add the same attribute to the component in return statement
   * 3. If the component in return statement is HTML tag, we add BD_FE_ID attribute, else (user-defined component) add testId={testId} attribute
   */
  function addTestAutomationAttributesPlugin() {
    return {
      visitor: {
        JSXElement(path) {
          const attributes = path.node.openingElement.attributes;
          const componentName = getContent(path.node.openingElement.name);
          // Skip for React.Fragment elements
          if (!componentName || componentName === REACT_FRAGMENT) {
            return;
          }

          // Add TESTID_PROP as a prop for user-defined components else add auto-generated BD_FE_ID
          const testId = isCapitalised(componentName) ? TESTID_PROP : BD_FE_ID;

          // Add testId by guessing
          const idNodes = [
            ...path.node.children,
            ...attributes.filter(
              a =>
                a.name?.name &&
                a.name.name !== CLASSNAME &&
                a.name.name !== a.value?.expression?.name && // Ignore not meaningful cases e.g. description={description}
                ID_ATTRIBUTE_KEY_LIST.some(
                  id => a.name.name.toLowerCase().includes(id) // As long as it's similar to any of the ID_ATTRIBUTE_KEY_LIST
                )
            ),
          ];

          const newTestIdValue = getContentForArray(idNodes)
            .filter(isCapitalised) // The value should be a capitalised string, i.e. i18n key
            .join(DELIMETER);
          if (newTestIdValue.length > 0) {
            attributes.push(createAttributeLiteral(testId, newTestIdValue));
          }

          // Add BD_FE_CLASSNAME
          const classnameAttribute = attributes.find(
            a => a.name?.name === CLASSNAME
          );
          const newAttributeValue = getContent(classnameAttribute);
          if (newAttributeValue.length > 0) {
            attributes.push(
              createAttributeLiteral(BD_FE_CLASSNAME, newAttributeValue)
            );
          }
        },
        FunctionDeclaration(path) {
          // function TableFilter(_a) { ... }
          const functionName = path.node.id?.name;
          // Skip if function name is not capitalized
          if (!functionName || !isCapitalised(functionName)) {
            return;
          }
          const returnStatement = path.node.body?.body?.find(s =>
            babel.types.isReturnStatement(s)
          );
          addComponentAttribute(
            returnStatement?.argument,
            functionName,
            path.node.params,
            path.node.body?.body
          );
        },
        VariableDeclaration(path) {
          // Should just have one declaration, var RadioTab =  React.memo(React.forwardRef(function (_a, ref) { ... }));
          const variableName = path.node.declarations[0]?.id?.name;
          // Skip if variable name is not capitalized
          if (!variableName || !isCapitalised(variableName)) {
            return;
          }
          const body = getMainFunctionBody(path.node.declarations[0]?.init);
          const returnStatement = body?.find(s =>
            babel.types.isReturnStatement(s)
          );
          const currentParameters = getMainFunctionParameter(
            path.node.declarations[0]?.init
          );
          addComponentAttribute(
            returnStatement?.argument,
            variableName,
            currentParameters,
            body
          );
        },
      },
    };
  }

  return {
    // Passed the loader options.
    customOptions({ opt1, opt2, ...loader }) {
      return {
        // Pull out any custom options that the loader might have.
        custom: { opt1, opt2 },

        // Pass the options back with the two custom options removed.
        loader,
      };
    },

    // Passed Babel's 'PartialConfig' object.
    config(cfg) {
      if (cfg.hasFilesystemConfig()) {
        // Use the normal config
        return cfg.options;
      }

      return {
        ...cfg.options,
        plugins: [
          ...(cfg.options.plugins || []),

          // Include a custom plugin in the options.
          addTestAutomationAttributesPlugin,
        ],
      };
    },

    result(result) {
      return {
        ...result,
        code: result.code + '\n// Generated by test-id loader',
      };
    },
  };
});
