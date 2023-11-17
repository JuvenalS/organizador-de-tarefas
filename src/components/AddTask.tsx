"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useStore } from "@/stores/StoreProvider";

const AddTask = observer(() => {
  const { taskStore } = useStore();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>();
  const [error, setError] = useState<string>();

  const handleNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 3) {
      setError("Por favor insira um título com pelo menos 3 caracteres");
    } else if (description.length < 3) {
      setError("Por favor insira uma descrição com pelo menos 3 caracteres");
    } else if (!status) {
      setError("Selecione um status para a tarefa");
    } else {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        status,
      };

      taskStore.addTask(newTask);

      // Reset the input values
      setTitle("");
      setDescription("");
      setStatus("");
      setError("");
      setOpen(!open);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button variant="default">Adicionar nova Tarefa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Adicionar Tarefa</DialogTitle>
          <DialogDescription>
            Adicione uma nova tarefa ao seu Gerenciador de Tarefas aqui. 
            Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleNewTask}>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                className="col-span-3"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
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
                value={status}
                onValueChange={setStatus}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Status da Tarefa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_andamento">Em andamento</SelectItem>
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
            <Button type="submit">Salvar Tarefa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default AddTask;