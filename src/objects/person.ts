class Person {
    constructor(personDTO: any) {
        this.Id = personDTO.id;
        this.DateOfBirth = personDTO.dateOfBirth;
        this.DateOfDeath = personDTO.dateOfDeath;
        this.ImdbId = personDTO.imdbId;
        this.Name = personDTO.name;
        this.ProfilePhoto = personDTO.profilePhoto;
    }

    Id!: string;

    ImdbId!: string;

    Name!: string;

    ProfilePhoto!: string;

    DateOfBirth!: string;

    DateOfDeath!: string;
}

export default Person;
