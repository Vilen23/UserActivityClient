import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertError({error}:{error:string}) {
  return (
    <Alert variant="destructive" className="border-rose-500 text-rose-500 flex items-center">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex items-center">
        {error}
      </AlertDescription>
    </Alert>
  )
}
