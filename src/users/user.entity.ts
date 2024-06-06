import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";

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

    @Column()
    notification_token:string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    
}