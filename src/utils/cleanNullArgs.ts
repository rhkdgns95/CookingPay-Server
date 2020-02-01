export const cleanNullArgs = (args: {}): {} => {   
    let nullArgs = {};

    Object.keys(args).forEach(key => {
        const data = args[key];
        if(data !== null) {
            nullArgs[key] = data;
        }
    });

    return nullArgs;
}