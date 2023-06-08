interface Props {
  className?: string
  children?: React.ReactNode
  type?: 'submit' | 'reset' | 'button' | undefined
}
export default function Button({ className, children, type }: Props) {
  return (
    <>
      <button type={type} className={`${className} rounded-sm bg-primary  text-white`}>
        {children}
      </button>
    </>
  )
}
