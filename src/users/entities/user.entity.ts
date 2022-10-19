import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @IsString()
  name: string;

  @Column('varchar', { unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber: string | null;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @IsString()
  address: string | null;

  @BeforeInsert()
  async hashPassword() {
    const SALT_OR_ROUNDS = 10;
    this.password = await bcrypt.hash(this.password, SALT_OR_ROUNDS);
  }

  @Column('varchar')
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
