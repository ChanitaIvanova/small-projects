export class TaskFilter {
    title: string;
    description: string;
    dueDateBefore: Date;
    dueDateAfter: Date;
    completed: boolean;
    tags: string[];

    constructor(title: string, description: string, dueDateBefore: Date, dueDateAfter: Date, completed: boolean, tags: string[]) {
        this.title = title;
        this.description = description;
        this.dueDateBefore = dueDateBefore;
        this.dueDateAfter = dueDateAfter;
        this.completed = completed;
        this.tags = tags;
    }
}   
