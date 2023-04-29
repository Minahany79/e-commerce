#!/bin/bash

# Get the folder name as a command-line argument
FOLDER_NAME=$1

# Create the folder
mkdir src/domains/$FOLDER_NAME
mkdir src/domains/$FOLDER_NAME/models
path_folder_name=src/domains/$FOLDER_NAME

# Capitalize the first letter of the folder name to get the class name
CLASS_NAME="$(tr '[:lower:]' '[:upper:]' <<<${FOLDER_NAME:0:1})${FOLDER_NAME:1}"

########################################################################################
# Create the interface.ts file and add code to it
INTERFACE_FILE="$path_folder_name/models/$FOLDER_NAME.interface.ts"
touch $INTERFACE_FILE

echo "export interface I${CLASS_NAME} {
    createdAt?: Date;
    updatedAt?: Date;
}
" >>$INTERFACE_FILE

########################################################################################
# Create the routes.ts file and add code to it
ROUTES_FILE="$path_folder_name/$FOLDER_NAME.routes.ts"

touch $ROUTES_FILE
echo "import { Router } from 'express';
import { IRouterBase } from '../../shared/abstractions/router-base';
import { ${CLASS_NAME}Controller } from './${FOLDER_NAME}.controller';

class ${CLASS_NAME}Router implements IRouterBase<${CLASS_NAME}Controller>  {

    router: Router;
    controller: ${CLASS_NAME}Controller;

    constructor() {
        this.router = Router();
        this.controller = new ${CLASS_NAME}Controller();
        this.addRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    addRoutes(): void {
        // add routes here
    }

}

export const ${FOLDER_NAME}Routes: Router = new ${CLASS_NAME}Router().getRouter();" >>$ROUTES_FILE
###################################################################################################
# Create the model.ts file and add code to it
MODEL_FILE="$path_folder_name/$FOLDER_NAME.model.ts"
touch $MODEL_FILE

echo "import { Model, Schema, model } from 'mongoose';
import { I${CLASS_NAME} } from './models/${FOLDER_NAME}.interface';

class ${CLASS_NAME}<T extends I${CLASS_NAME}> {
    public readonly ${FOLDER_NAME}Model: Model<T>;

    constructor() {
        const schema = new Schema<T>({
           
        }, {
            timestamps: true
        });

        this.${FOLDER_NAME}Model = model<T>('${CLASS_NAME}', schema);
    }
}
export const ${CLASS_NAME}Model = new ${CLASS_NAME}().${FOLDER_NAME}Model;
" >>$MODEL_FILE

########################################################################################
# Create the service.ts file and add code to it
SERVICE_FILE="$path_folder_name/$FOLDER_NAME.service.ts"
touch $SERVICE_FILE

echo "import { Model } from 'mongoose';
import { ${CLASS_NAME}Model } from './${FOLDER_NAME}.model';
import { I${CLASS_NAME} } from './models/${FOLDER_NAME}.interface';


export class ${CLASS_NAME}Service {
    private readonly ${FOLDER_NAME}Model: Model<I${CLASS_NAME}>;

    constructor() {
        this.${FOLDER_NAME}Model = ${CLASS_NAME}Model;
    }

}" >>$SERVICE_FILE
########################################################################################
# Create the controller.ts file and add code to it
CONTROLLER_FILE="$path_folder_name/$FOLDER_NAME.controller.ts"
touch $CONTROLLER_FILE

echo "import { ${CLASS_NAME}Service } from './${FOLDER_NAME}.service';

export class ${CLASS_NAME}Controller {
    private readonly ${FOLDER_NAME}Service: ${CLASS_NAME}Service;
  
    constructor() {
        this.${FOLDER_NAME}Service = new ${CLASS_NAME}Service();
    }
}
" >>$CONTROLLER_FILE
