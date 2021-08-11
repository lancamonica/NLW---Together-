import { Grid } from "@material-ui/core"

type props = any

export default function GridItem(props: props) {
  return (
    <Grid
      key={props.key}
      className={props.className}
      item={props.item}
      xs={props.xs}
      sm={props.sm}
      md={props.md}
      lg={props.lg}
    >
      {props.children}
    </Grid>
  )
}


