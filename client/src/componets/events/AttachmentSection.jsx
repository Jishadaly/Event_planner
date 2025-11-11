import { FileText, Download } from "lucide-react"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"

export default function AttachmentsSection({ attachments }) {
    const getFileIcon = () => {
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }

    return (
        <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Attachments
            </h2>

            <div className="space-y-3">
                {attachments.map((attachment) => (
                    <div
                        key={attachment.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            {getFileIcon(attachment.fileType)}
                            <div className="min-w-0">
                                <p className="font-semibold text-sm truncate">{attachment.fileName}</p>
                                <p className="text-xs text-muted-foreground">{attachment.uploadedAt.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(attachment.fileUrl, "_blank")}
                            className="flex-shrink-0"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </Card>
    )
}
