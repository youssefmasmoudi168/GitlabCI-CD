import { useContext, useEffect, useState } from 'react';
import PropTypes, { node } from 'prop-types';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Collapse,
  Typography
} from '@mui/material';

import {
  NavLink,
  NavLink as RouterLink,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate
} from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import {
  AccountTreeOutlined,
  ArrowDropDown,
  CalendarViewWeekOutlined,
  ChevronRightOutlined,
  DescriptionOutlined,
  ExpandLess,
  ExpandMore,
  FolderOpenOutlined,
  ListAltOutlined,
  PeopleAltOutlined,
  SummarizeOutlined,
  TimelineOutlined
} from '@mui/icons-material';
import getCurrentUser from 'src/services/utils/getCurrentUser';

import { TreeItem, TreeView, treeItemClasses } from '@mui/lab';
import { useFetchAllScenariosQuery } from 'src/services/api/api';
import { v4 as uuidv4 } from 'uuid';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.primary,
    borderRadius: theme.spacing(1),
    paddingX: theme.spacing(2),
    paddingY: theme.spacing(1),
    margin: theme.spacing(0.5, 0),
    fontWeight: theme.typography.fontWeightBold,
    '&.Mui-expanded': {
      color: theme.colors.primary,
      fontWeight: theme.typography.fontWeightBold
    },
    '&:hover': {
      color: theme.colors.primary.main,
      backgroundColor: alpha(theme.colors.alpha.trueWhite[100], 0.04)
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      color: theme.colors.primary.main,
      backgroundColor: alpha(theme.colors.alpha.trueWhite[100], 0.04)
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit'
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginX: theme.spacing(1),
    [`& .${treeItemClasses.content}`]: {
      padding: 2
    }
  }
}));

function StyledTreeItem(props: any) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    labelLink,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5 }}>
          <Box
            component={LabelIcon}
            color="inherit"
            sx={{ m: 1, width: '16px', height: '16px' }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            <NavLink
              to={labelLink}
              style={({ isActive }) =>
                isActive
                  ? { textDecoration: 'none', color: 'inherit' }
                  : { textDecoration: 'none', color: 'inherit' }
              }
            >
              {labelText}
            </NavLink>
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  nodeId: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  labelLink: PropTypes.string
};

function SidebarMenu(props: any) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const parsePath = (path: string) => {
    const pathArray = path.split('/');
    const pathSegments = [];
    for (let i = 0; i < pathArray.length; i++) {
      if (pathArray[i] !== '') {
        pathSegments.push(pathArray.slice(0, i + 1).join('/'));
      }
    }
    return pathSegments.filter((part) => {
      const partArray = part.split('/');
      const lastPart = partArray[partArray.length - 1];
      return part !== '/dashboards' && !lastPart.match(/^\d+$/);
    });
  };
  function getRandomInt(max, min) {
    return Math.floor(Math.random() * max + min);
  }
  const user = getCurrentUser();
  const projects = props?.projects;
  const scenarios = useFetchAllScenariosQuery();

  useEffect(() => {
    const pathArray = parsePath(location.pathname);
    setExpanded(pathArray);
  }, [location]);

  return (
    <>
      <TreeView
        expanded={expanded}
        selected={selected}
        onNodeSelect={(event, nodes) => {
          setSelected(nodes);
        }}
        aria-label="Sidebar"
        defaultExpandIcon={<ChevronRightOutlined />}
        defaultCollapseIcon={<ArrowDropDown />}
        sx={{
          height: '100%',
          flexGrow: 1,
          width: '100%',
          overflowY: 'auto',
          p: 2
        }}
      >
        <StyledTreeItem
          nodeId="/dashboards/projects"
          labelText="Projects"
          labelIcon={AccountTreeOutlined}
          labelLink={`projects`}
        >
          {projects &&
            projects?.map((project: any, index: any) => {
              return (
                <div key={uuidv4()}>
                  {project && (
                    <StyledTreeItem
                      labelIcon={FolderOpenOutlined}
                      nodeId={`/dashboards/projects/${project.id}/sprints`}
                      // key={`projects/${project?.id}`}
                      // key={uuidv4()}
                      labelText={project?.projectName}
                      labelLink={`projects/${project.id}/sprints`}
                    >
                      {project?.sprints &&
                        project?.sprints?.map((sprint: any, index1: any) => {
                          return (
                            <div key={uuidv4()}>
                              {sprint && (
                                <StyledTreeItem
                                  nodeId={`/dashboards/projects/${project.id}/sprints/${sprint.id}/use-cases`}
                                  // key={`sprints/${sprint?.id}`}
                                  // key={uuidv4()}
                                  labelIcon={CalendarViewWeekOutlined}
                                  labelText={sprint?.sprintName}
                                  labelLink={`projects/${project.id}/sprints/${sprint.id}/use-cases`}
                                >
                                  {sprint?.useCases &&
                                    sprint?.useCases.map(
                                      (useCase: any, index2: any) => {
                                        return (
                                          <div key={uuidv4()}>
                                            {useCase && (
                                              <StyledTreeItem
                                                nodeId={`/dashboards/projects/${project.id}/sprints/${sprint.id}/use-cases/${useCase.id}/test-cases`}
                                                // key={`usecases/${useCase?.id}`}
                                                // key={uuidv4()}
                                                labelIcon={DescriptionOutlined}
                                                labelText={useCase?.title}
                                                labelLink={`projects/${project.id}/sprints/${sprint.id}/use-cases/${useCase.id}/test-cases`}
                                              />
                                            )}
                                          </div>
                                        );
                                      }
                                    )}
                                </StyledTreeItem>
                              )}
                            </div>
                          );
                        })}
                    </StyledTreeItem>
                  )}
                </div>
              );
            })}
        </StyledTreeItem>
        <StyledTreeItem
          nodeId="/dashboards/scenarios"
          labelLink="scenarios"
          labelText="Scenarios"
          labelIcon={TimelineOutlined}
        >
          {scenarios?.data?.map((scenario: any, index: any) => {
            return (
              <StyledTreeItem
                nodeId={`/dashboards/scenarios/${scenario.id}/use-cases`}
                key={uuidv4()}
                labelIcon={TimelineOutlined}
                labelText={scenario?.designation}
                labelLink={`scenarios/${scenario.id}/use-cases`}
              />
            );
          })}
        </StyledTreeItem>
        <StyledTreeItem
          nodeId="/dashboards/reports"
          labelLink="reports"
          labelText="Reports"
          labelIcon={SummarizeOutlined}
        />
        {user?.roles[0] == 'ROLE_ADMIN' && (
          <StyledTreeItem
            nodeId="/dashboards/users"
            labelText="Users List"
            labelLink="users"
            labelIcon={PeopleAltOutlined}
          />
        )}
      </TreeView>
    </>
  );
}

export default SidebarMenu;
