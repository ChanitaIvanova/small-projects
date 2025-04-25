import { IsBoolean, IsNotEmpty, Length, IsArray, ArrayMaxSize, ArrayMinSize, IsString } from 'class-validator';

export class TaskInput {
    @Length(2, 50)
    title!: string;

    @Length(2, 500)
    description!: string;

    @IsBoolean()
    completed: boolean = false;

    @IsNotEmpty()
    dueDate!: Date;

    @IsArray()
    @ArrayMinSize(0)
    @ArrayMaxSize(10) // Limit to 10 tags max
    @IsString({ each: true }) // Ensure each item is a string
    tags!: string[];
}