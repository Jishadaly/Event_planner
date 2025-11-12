import {cn} from '../../utils/cn'
export function FormError({ className, children }) {
    if (!children) return null

    return (
        <div className={cn("text-sm text-destructive mt-1", className)} >
            {children}
        </div >
    )
}


//   <p className="text-sm text-destructive mt-1 transition-opacity duration-300 opacity-100 animate-in fade-in">
//   {message}
// </p>
