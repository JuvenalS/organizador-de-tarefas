import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useStore } from "@/stores/StoreProvider";

interface EditTaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditTask = ({
  id,
  title,
  description,
  status,
  open,
  setOpen,
}: EditTaskProps) => {
  const { taskStore } = useStore();
  const router = useRouter();
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newStatus, setNewStatus] = useState<string>(status);
  const [error, setError] = useState<string>();

  const handleEditedTask = (e: any) => {
    e.preventDefault();

    if (newTitle.length < 3) {
      setError("Por favor insira um título com pelo menos 3 caracteres");
    } else if (newDescription.length < 3) {
      setError("Por favor insira uma descrição com pelo menos 3 caracteres");
    } else if (!newStatus) {
      setError("elecione um status para a tarefa");
    } else {
      const editedTask = {
        title: newTitle,
        description: newDescription,
        status: newStatus,
      };

      taskStore.editTask(id, editedTask);

      // Reset the input values
      setNewTitle("");
      setNewDescription("");
      setNewStatus("");
      setError("");
      setOpen(!open);
      router.refresh();
    }
  };

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-xl">Editar Tarefa</DialogTitle>
        <DialogDescription>
            Edite ou atualize sua tarefa aqui. Clique em salvar quando terminar.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleEditedTask}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label
              htmlFor="name"
              className="text-left"
            >
              Título
            </Label>
            <Input
              id="name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label
              htmlFor="description"
              className="text-left"
            >
              Descrição
            </Label>
            <Textarea
              id="description"
              rows={5}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Descrição"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label
              htmlFor="status"
              className="text-left"
            >
              Status
            </Label>
            <Select
              value={newStatus}
              onValueChange={setNewStatus}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Task Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="text-center py-1 rounded bg-error-background text-error-foreground">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="submit">Salvar Alterações</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditTask;