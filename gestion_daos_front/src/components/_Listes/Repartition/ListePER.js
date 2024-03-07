import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';
import axios from 'axios';
import Ajouter_PER from '../../_Ajouter/Aj-Repartition/Ajouter_PER';
import { REPARTITION_URL } from '../../../Server_URL/Urls';
import Modifier_PER from '../../_Modifier/Repartition/Modifier_PER';

const rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const headCells = [
  { id: 'idEns', numeric: false, disablePadding: false, label: 'Identifiant'},
  { id: 'matriculePer', numeric: false, disablePadding: false, label: 'Matricule_Per' },
  { id: 'prenomEns', numeric: false, disablePadding: false, label: 'Prenom' },
  { id: 'nomEns', numeric: false, disablePadding: false, label: 'Nom'},
  { id: 'gradeEns', numeric: false, disablePadding: false, label: 'Grade' },
  { id: 'dateCreationEns', numeric: false, disablePadding: false, label: 'Date Creation' },
  { id: 'Operations', numeric: false, disablePadding: false, label: 'Operations' },
 // { id: 'Details', numeric: false, disablePadding: false, label: 'Details' },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ width: headCell.width, textAlign: headCell.numeric ? 'right' : 'left' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          Liste des Enseignants PER
        </Typography>
      )}
        <IconButton>
            <Ajouter_PER/>
          </IconButton>
        </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ListePER() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('idEns');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [selectedPER, setSelectedPER] = React.useState(null)

  React.useEffect(() => {
    axios.get('http://localhost:8084/repartition/per')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

/*===========================================*/
const handlePERClickDelete = (per) => {
  setSelectedPER(per);
};

const handleEditClick = (per) => {
  setSelectedPER(per); // Mettez à jour selectedUpdateUE avec l'UE à modifier
};

const handlePERDelete = (e, id) => { 
  
  e.stopPropagation();
  const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer ce PER ${id} ?`);

  if(confirmation){

    axios.delete(`${REPARTITION_URL}/per/${id}`)
    .then( response => {
      console.log("PER supprimée avec succès :", id);
      setData(data.filter(per => per.idEns !== id))
    })
    .catch( err => {
      throw new Error("Erreur lors de la suppression de l'UE :", err)
    });
  }
  else{
    window.alert(`Suppression  du PER ${id} annulée`);
  }

}

if(selectedPER){
  return <Modifier_PER per={selectedPER} open={true} onClose={() => setSelectedPER(null)} />;
}

/*===========================================*/
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <div>
      <br/> &nbsp;
      <Button 
        href="/repartition" 
        style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
      > ⬅
      </Button>

      <Box sx={{ width: '100%', paddingTop: "10px" }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}   
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                        >
                          {row.idEns}
                        </TableCell>
                        <TableCell align="left">{row.matriculePer}</TableCell>
                        <TableCell align="left">{row.prenomEns}</TableCell>
                        <TableCell align="left">{row.nomEns}</TableCell>
                        <TableCell align="left">{row.gradeEns}</TableCell>
                        <TableCell align="left">{row.dateCreationEns}</TableCell>
                        <TableCell > 
                            <IconButton 
                              aria-label="edit"
                              onClick={() => handleEditClick (row)}
                              >
                                <EditIcon color='success' />
                            </IconButton> 
                            &nbsp; &nbsp;

                            <IconButton 
                              aria-label="delete" 
                              onClick={(event) => handlePERDelete(event, row.idEns)}>
                                <DeleteIcon sx={{color:"#cd0000"}}/>
                            </IconButton>
                         </TableCell>
                         {/* <TableCell> 
                            <Button sx={{
                            borderRadius:"30px solid",
                            color:"white",
                            fontWeight:"600",
                            background:"rgb(9, 44, 38)",
                            textTransform:"capitalize"

                            }}>Détails
                            </Button>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </div>
  );
}