module.exports = function ({ types: t }) {
    let objectPathName
    let objectPath

    return {
        visitor: {
            ImportDeclaration(path) {
                if (path.node.source.value === 'react-loadable') {
                    path.node.specifiers.forEach((v) => {
                        if (t.isImportDefaultSpecifier(v)) {
                            objectPathName = v.local.name
                            objectPath = path
                        }
                    })
                }
            },

            CallExpression(path) {
                if (objectPathName && path.node.callee.name === objectPathName) {
                    const modulePath = path.node.arguments[0].properties
                        .find((v) => v.key.name === 'loader').value.body.arguments[0].value

                    const newExpr = t.memberExpression(
                        t.callExpression(t.identifier('require'), [t.stringLiteral(modulePath)]),
                        t.identifier('default')
                    )

                    path.replaceWith(newExpr)
                }
            },

            Program: {
                exit() {
                    if (objectPath) {
                        objectPath.remove()
                    }
                }
            }
        },
    }
}
