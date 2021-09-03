//external
import { Grid } from "@material-ui/core"

type props = any

export default function GridContainer(props: props) {
  return (
    <Grid
    key={props.key}
    container={props.container}
    spacing={props.spacing}
    justify={props.justifyContent}
    className={props.className}
    wrap={props.wrap}
    direction={props.direction}
    alignItems={props.alignItems}
    style={props.style}
  >
    {props.children}
  </Grid>
  )
}
