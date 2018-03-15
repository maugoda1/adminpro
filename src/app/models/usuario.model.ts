

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,      // el ? significa que es opcional el parametro
        public role?: string,
        public google?: string,
        public _id?: string
    ) { }

}
