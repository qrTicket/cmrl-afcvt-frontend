import { Station } from 'src/app/admin/_models/station.model';
import { ProductType } from './product-type.model';
import { Product } from './product.model';

export class Terminal {
     id: string;
     productId: Product;
     station: Station;
     productTypeId: ProductType;
    // activationTime: String;
    // terminalIp: String;
    // deActivationTime: String;
    // mode: String;
    // direction: String;
    // aisleMode: String;
    // emergencyMode: String;
    // entryExitOverride: String;
    // timeModeOverride: String;
    // highSecurityMode: String;
}
