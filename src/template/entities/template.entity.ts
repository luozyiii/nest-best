import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, comment: '模版名称' })
  name: string;

  @Column({ type: 'varchar', length: 255, comment: '模版类型' })
  type: string;

  @Column({ type: 'varchar', comment: 'Git项目地址' })
  url: string;

  @Column({
    type: 'timestamp',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_time: Date;

  @Column({
    type: 'timestamp',
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_time: Date;
}
