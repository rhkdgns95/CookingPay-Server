const privateResolvers = (resolverFn: any) => async (parent: any, args: any, context: any, info: any) => {
    if(!context.req.user) {
        throw new Error("No JWT");
    }
    const result = await resolverFn(parent, args, context, info);
    return result;    
};

export default privateResolvers;