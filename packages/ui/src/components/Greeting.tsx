
/**
 * 
 */
export interface GreetingProps {
    message: string
}

/**
 * 
 * @param props 
 */
export const Greeting: React.FC<GreetingProps> = (props) => <>
    <h2>{props.message}</h2>
</>