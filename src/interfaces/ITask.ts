export interface ITask {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
  tags_ids: string[];
  priority_id: string;
  created_by_user_id: string;
}

export interface ITaskCreateOrUpdateDTO {
  title: string;
  description: string;
  due_date?: string;
  tags_ids?: string[];
  priority_id?: string[];
  created_by_user_id: string;
}