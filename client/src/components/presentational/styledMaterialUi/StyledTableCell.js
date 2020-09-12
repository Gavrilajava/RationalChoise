
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import teal from '@material-ui/core/colors/teal'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: teal[500],
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    lineHeight: 3,
    width: 'auto'
  }
}))(TableCell)

export default StyledTableCell