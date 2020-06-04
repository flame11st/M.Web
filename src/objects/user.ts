class User {
    constructor(userDTO: any) {
        this.Id = userDTO.id;
        this.Name = userDTO.name;
        this.Email = userDTO.email;
        this.Role = userDTO.role;
    }

    Id!: string;

    Name!: string;

    Email!: string;

    Role!: string;
}

export default User;
