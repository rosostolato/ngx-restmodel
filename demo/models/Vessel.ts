export interface IVessel {
	id: number;
	region: number;
	business: number;
	service: number;
	type: number;
	category: number;
	imo?: number;
	mmsi?: number;
	name: string;
	start: string;
	end?: any;
	assets: any[];
}

export class Vessel implements IVessel {
	id: number;
	region: number;
	business: number;
	service: number;
	type: number;
	category: number;
	imo?: number;
	mmsi?: number;
	name: string;
	start: string;
	end?: any;
  assets: any[];

  constructor (data?: IVessel) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
