import React, { useState, Suspense } from "react";
import { Container, Grid, Paper, CssBaseline, Button, Typography, CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const Calculator = React.lazy(() => import("./pages/Calculator"));
const BusinessCheckList = React.lazy(() => import("./pages/BusinessCheckList"));
const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            CTHua {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));
const toolList = [<Calculator />, <BusinessCheckList />];
const App = () => {
    const [tool, setTool] = useState(0);
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="md">
            <Paper>
                <CssBaseline />

                <div className={classes.paper}>
                    <br />
                    <Typography variant="h4" color="textSecondary" align="left">
                        綠能小工具
                    </Typography>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item md={3} xs={6}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => setTool(0)}>
                                坪數計算機
                            </Button>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => setTool(1)}>
                                業務拜訪前檢查
                            </Button>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <Button variant="contained" color="primary" fullWidth disabled>
                                待開發
                            </Button>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <Button variant="contained" color="primary" fullWidth disabled>
                                待開發
                            </Button>
                        </Grid>
                    </Grid>
                    <Suspense fallback={<CircularProgress />}>{toolList[tool]}</Suspense>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Paper>
        </Container>
    );
};

export default App;