export interface Students{
    fullName:string;
    email:string;
    password:string;
    nicNumber:string;
    roleId:number;
    dateOfBirth:string;
    gender:string;
    mobileNumber:number;
    profilePicture:string;
    registrationFee:string;
    isRegistrationFeePaid:string;
}

export interface Lecturers{
    fullName:string;
    email:string;
    password:string;
    nicNumber:string;
    roleId:number;
    dateOfBirth:string;
    gender:string;
    address:string;
    mobileNumber:number;
    profilePicture:string;
    courses:string;

}

export interface Courses{
    courseName:string;
    level:string;
    courseFee:string;
    courseType:string
    description:string;
}

export interface ContactUs{
    fullName:string;
    emailAddress:string;
    message:string;
}

export interface StudentCourse{
    studentCount:number;
}