function evaluate(expr, scope) {
    if (expr.type === "value") {
        return expr.value;
    } else if (expr.type === "word") {
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            throw new ReferenceError(
                `Undefined binding: ${expr.name}`);
        }
    } else if (expr.type === "apply") {
        const { operator, args } = expr;
        if (operator.type === "word" && operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            const op = evaluate(operator, scope);
            if (typeof op === "function") {
                return op(...args.map(arg => evaluate(arg, scope)));
            } else {
                throw new TypeError("Applying a non-function.");
            }
        }
    } else {
        throw new TypeError("Invalid expression type")
    }
}

const specialForms = Object.create(null);

specialForms.if = (args, scope) => {
    if (args.length !== 3) {
        throw new SyntaxError("Wrong number of args to if");
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
};

specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
};

specialForms.define = (args, scope) => {
    if (args.length !== 2 || args[0].type !== "word") {
        throw new SyntaxError("Incorrect use of define");
    }

    const value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

specialForms.while = (args, scope) => {
    if (args.length !== 2) {
        throw new SyntaxError("Wrong number of args to while");
    }

    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }

    return false;
};

specialForms.fun = (args, scope) => {
    if (!args.length) {
        throw new SyntaxError("Functions need a body");
    }

    const body = args[args.length - 1];

    const params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type !== "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });

    return function (...args) {
        if (args.length !== params.length) {
            throw new TypeError("Wrong number of arguments");
        }

        const localScope = Object.create(scope);
        for (let i = 0; i < args.length; i++) {
            localScope[params[i]] = args[i];
        }

        return evaluate(body, localScope);
    };
};

module.exports = { evaluate }
