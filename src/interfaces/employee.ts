

export interface currentUser {
    email: string,
    userName: string,
    password: string,
    role: number
}

export interface Employee {
    id?: string;
    name: string;
    email: string;
    phoneNumber: string;
    isGraduated: boolean;
    uploadImage?: string;
    date?: string;
    profileImage : string;
}

export interface PartialEmployee {
    id: number;
    first_name?: string;
    last_name?: string;
    profile_photo?: string;
    longitude: number;
    latitude: number;
}

export interface Pagination {
    count: number;
    next: null;
    previous: null;
    total_pages: number;
    results: Employee[];
}
