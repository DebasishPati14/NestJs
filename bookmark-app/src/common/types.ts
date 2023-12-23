import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponse {
  @ApiProperty()
  success: string;
}

export class ErrorResponse {
  @ApiProperty()
  error: string;
}
