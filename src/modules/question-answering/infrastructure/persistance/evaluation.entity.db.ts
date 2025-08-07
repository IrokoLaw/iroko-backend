import { BaseEntityDb } from "@/libs/db/base-entity-db";
import { EvaluationNoteEnum } from "../../domain/values-objects/evaluation-note-value-object";
import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { ChatDbEntity } from "./chat.entity.db";

@Entity("evaluation")
export class EvaluationDbEntity extends BaseEntityDb {
  @Column({ type: "enum", enum: EvaluationNoteEnum, nullable: false })
  note: EvaluationNoteEnum;

  @Column({ type: "text", nullable: true, default: "" })
  comment?: string;

  @Column({ type: "uuid", nullable: false })
  chatId: string;
}
