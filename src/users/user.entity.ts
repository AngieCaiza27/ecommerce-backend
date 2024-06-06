import { Entity, PrimaryGeneratedColumn,Column, BeforeInsert } from "typeorm";
import {hash} from 'bcrypt';
@Entity({name : 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    lastname:string;

    @Column({unique :true})
    email:string;

    @Column({unique :true})
    phone:string;

    @Column({nullable:true})
    image:string;

    @Column()
    password:string;

    @Column({default: 'default_token'})
    notification_token:string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @BeforeInsert()
    async hashPassword(){
        this.password=await hash(this.password,Number(process.env.HASH_SALT));
    }

    
}