import { IsNotEmpty, IsString } from "class-validator";

export class CreateTokenDto {
    @IsNotEmpty()
    @IsString()
    client_id: string;
}
