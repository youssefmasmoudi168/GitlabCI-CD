import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ScenarioUseCaseRow from './ScenarioUseCaseRow';

const ScenarioDetailsTable = (props: any) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Prerequirements</TableCell>
            <TableCell>Expected Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.useCases?.map((useCase, index) => {
            return (
              <ScenarioUseCaseRow open={open} key={index} useCase={useCase} />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScenarioDetailsTable;
