import React, {memo} from "react";
import PropTypes from 'prop-types';
import {
    Table, TableBody, TableHead, TableRow, TableContainer, TableCell, Fab, Paper, makeStyles, TextField, IconButton,
    TableFooter, useTheme
} from "@material-ui/core";
import {Link} from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& h1": {
            color: "#2f303f"
        }
    },
    table: {
        marginTop: theme.spacing(3),
        "& th": {
            backgroundColor: "#575761",
            color: "white"
        },
        "& span.active": {
            color: "green",
        },
        "& span.inactive": {
            color: "red",
        },
        "& tr": {
            whiteSpace: "nowrap",
        },
        "& .MuiFab-root": {
            width: 36,
            height: 36
        },
        "& .MuiSvgIcon-root": {
            width: 20,
            height: 20
        },
        "& td > a.MuiFab-root": {
            backgroundColor: "#5db273",
            color: "white"
        },

        "& td > button.MuiFab-root": {
            backgroundColor: "#f24c3d",
            color: "white"
        }
    },
}));


const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = event => onChangePage(event, 0);
    const handleBackButtonClick = event => onChangePage(event, page - 1);
    const handleNextButtonClick = event => onChangePage(event, page + 1);
    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function UserTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchFilter, setSearchFilter] = React.useState('');
    const [searchInput, setSearchInput] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onSubmitSearch = () => setSearchFilter(searchInput);

    const users = props.users.filter(obj => obj.name.toLowerCase().includes(searchFilter.toLowerCase()));

    return (
        <TableContainer component={Paper} className={classes.table}>
            <TextField
                label={"search"}
                onChange={event => setSearchInput(event.target.value)}
                onKeyDown={(e) => e.keyCode === 13 ? onSubmitSearch() : []}
            />
            <Fab size={"small"} onClick={onSubmitSearch}><SearchIcon/></Fab>
            <Table size={"small"}>
                <TableHead>
                    <TableRow>
                        <TableCell>NAME</TableCell>
                        <TableCell>E-MAIL</TableCell>
                        <TableCell>STATUS</TableCell>
                        <TableCell>ACTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : users
                    ).map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                                <span
                                    className={row.status ? "active" : "inactive"}>{row.status ? "Active" : "Inactive"}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Fab component={Link} to={"/users/edit/" + row.id}><EditIcon/></Fab>
                                <Fab onClick={() => props.onDeleteClick(row.id)}>
                                    <DeleteForeverIcon/>
                                </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 15, 20, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page'},
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default memo(UserTable);