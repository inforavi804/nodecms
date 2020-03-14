class AppError extends Error{

    
    constructor(errType, errDesc, errAll){
        
        // Calling parent constructor of base Error class.
        super(errDesc);

        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        
        // Capturing stack trace, excluding constructor call from it.
        //Error.captureStackTrace(this, this.constructor);

    }
}


export default AppError;