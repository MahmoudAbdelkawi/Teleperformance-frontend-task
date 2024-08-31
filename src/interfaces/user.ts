interface IEducation {
    id: number;
    title: string;
    provider: string;
    icon: string;
    year: string;
}
interface ICertification {
    id: number;
    title: string;
    provider: string;
    icon: string;
    year: string;
}
interface ILanguages {
    id: number;
    lang: string;
    provider: string;
    icon: string;
    year: string;
}
export interface User {
    id: number;
    position: string;
    department: string;
    name: string;
    img: string;
    certifications?: ICertification[];
    languages?: ILanguages[];
    education?: IEducation[];
}
