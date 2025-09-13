import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsObject } from 'class-validator';

export class WebhookDto {
  @ApiProperty({ 
    description: 'Webhook 数据', 
    required: false,
    example: {
      event: 'user.created',
      data: {
        id: 123,
        name: 'John Doe',
        email: 'john@example.com'
      }
    }
  })
  @IsOptional()
  @IsObject()
  data?: any;

  @ApiProperty({ 
    description: '事件类型', 
    required: false,
    example: 'user.created'
  })
  @IsOptional()
  event?: string;

  @ApiProperty({ 
    description: '时间戳', 
    required: false,
    example: '2024-01-01T00:00:00.000Z'
  })
  @IsOptional()
  timestamp?: string;
}
