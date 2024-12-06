import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
  useTheme
} from '@mui/material';

import { useEffect, useState } from 'react';

import ScenarioTestCaseRow from './ScenarioTestCaseRow';
import { useFetchAllTestCasesByUseCaseIdQuery } from 'src/services/api/api';
const ScenarioUseCaseRow = (props: any) => {
  const useCase = props?.useCase;
  const [open, setOpen] = useState(false);
  const [testCases, setTestCases] = useState<any>();
  const { data, isLoading, isSuccess } = useFetchAllTestCasesByUseCaseIdQuery(
    useCase?.id
  );

  useEffect(() => {
    if (isSuccess) {
      setTestCases(data);
    }
  }, [data, isLoading, isSuccess]);

  const theme = useTheme();

  return (
    <>
      <TableRow hover>
        <TableCell colSpan={0}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          onClick={props.onClick}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {useCase?.title}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          onClick={props.onClick}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {useCase?.prereq}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          onClick={props.onClick}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {useCase?.expectedResult}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 2, backgroundColor: theme.palette.grey[100] }}>
              <TableContainer
                component={Paper}
                sx={{ background: theme.palette.background.paper }}
              >
                <Table
                  size="small"
                  sx={{
                    [`& .${tableCellClasses.root}`]: {
                      borderBottom: '.5px solid #e0e0e0'
                    }
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell variant="body">Name</TableCell>
                      <TableCell variant="body">Summary</TableCell>
                      <TableCell variant="body">Actor</TableCell>
                      <TableCell variant="body">Precondition</TableCell>
                      <TableCell variant="body">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {testCases?.map((testCase, index) => {
                      return (
                        <ScenarioTestCaseRow key={index} testCase={testCase} />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ScenarioUseCaseRow;
