import React, { Component } from 'react';
import { Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class PlaylistItem extends Component {
  render() {
    return (
      <Table>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>Roadtrip Mix #1</TableRowColumn>
            <TableRowColumn>Matt, John, Mike</TableRowColumn>
            <TableRowColumn>Last played</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );

  }
}

export default PlaylistItem;