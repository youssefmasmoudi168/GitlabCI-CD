import { Close, Done, PlayArrow } from '@mui/icons-material';
import {
  Button,
  Chip,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CreateExecutionForm from '../Execution/CreateExecutionForm';
import { useCreateExecutionMutation } from 'src/services/api/api';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
const ScenarioTestCaseRow = (props: any) => {
  const [testCase, setTestCase] = useState(props?.testCase);
  const isVisitor: boolean = useSelector(
    (state: RootState) => state.role.isVisitor
  );
  useEffect(() => {
    setTestCase(props?.testCase);
  }, [props?.testCase]);
  const theme = useTheme();
  const [createExecution] = useCreateExecutionMutation();
  const [openExecutionForm, setOpenExecutionForm] = useState(false);
  const handleOpenExecutionForm = () => setOpenExecutionForm(true);
  const handleCloseExecutionForm = () => setOpenExecutionForm(false);
  const getStatusStyles = (status) => {
    switch (status) {
      case undefined:
        return {
          backgroundColor: theme.palette.grey[100],
          color: theme.palette.grey[800]
        };
        break;
      case '0':
        return {
          backgroundColor: theme.colors.error.lighter,
          color: theme.colors.error.dark
        };
        break;
      case '1':
        return {
          backgroundColor: theme.colors.success.lighter,
          color: theme.colors.success.dark
        };
      default:
        break;
    }
  };
  const etat = testCase?.execution[0]?.etat;
  let color = '';
  let icon: any;
  if (etat == undefined) {
    color = theme.palette.background.default;
  } else {
    if (etat.toString() == '0') {
      color = theme.colors.error.lighter;
      // 'rgb(255, 74, 74, 0.1)'
    } else {
      color = theme.colors.success.lighter;
      icon = () => {
        return <Done />;
      };
    }
  }
  return (
    <TableRow sx={() => getStatusStyles(etat)}>
      <TableCell sx={{ color: 'inherit' }}>
        <Typography fontWeight="bold" noWrap>
          {testCase?.testCaseName}
        </Typography>
      </TableCell>
      <TableCell sx={{ color: 'inherit' }}>
        <Typography variant="body1" fontWeight="bold" noWrap>
          {testCase?.summary}
        </Typography>
      </TableCell>
      <TableCell sx={{ color: 'inherit' }}>
        <Typography variant="body1" fontWeight="bold" noWrap>
          {testCase?.actor}
        </Typography>
      </TableCell>
      <TableCell sx={{ color: 'inherit' }}>
        <Typography variant="body1" fontWeight="bold" noWrap>
          {testCase?.preCondition}
        </Typography>
      </TableCell>

      <TableCell sx={{ color: 'inherit', height: '50px' }}>
        {etat == undefined && !isVisitor ? (
          <Tooltip title="Execute Test Case" arrow>
            <Button
              onClick={handleOpenExecutionForm}
              variant="text"
              size="small"
              color="inherit"
              startIcon={<PlayArrow fontSize="small" />}
            >
              Execute
            </Button>
          </Tooltip>
        ) : (
          <>
            {etat.toString() == '0' ? (
              <>
                <Chip
                  icon={<Close fontSize="small" />}
                  color="error"
                  label="Fail"
                  size="small"
                />
              </>
            ) : (
              <>
                <Chip
                  icon={<Done fontSize="small" />}
                  color="success"
                  label="Success"
                  size="small"
                />
              </>
            )}
          </>
        )}
      </TableCell>
      <CreateExecutionForm
        testCase={testCase}
        open={openExecutionForm}
        createExecution={createExecution}
        handleClose={handleCloseExecutionForm}
      />
    </TableRow>
  );
};

export default ScenarioTestCaseRow;
