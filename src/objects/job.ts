class Job {
    constructor(jobDTO: any) {
        this.Name = jobDTO.name;
        this.Running = jobDTO.running;
    }

    Name!: string;

    Running!: boolean;
}

export default Job;
