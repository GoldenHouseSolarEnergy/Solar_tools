import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Box, Button, Typography, TextField } from "@material-ui/core";
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}
const Calculator = () => {
    const [squareMeter, setSquareMeter] = useState("");
    const [landSize, setLandSize] = useState("");
    const [kw, setKw] = useState("");
    const [disSquareMeter, setDisSquareMeter] = useState("");
    const [disLandSize, setDisLandSize] = useState("");
    const [disKw, setDisKw] = useState("");

    const handleSquareMeterChange = async (event) => {
        const value = event.target.value == "" ? "" : parseFloat(event.target.value);
        setSquareMeter(value);
    };
    const handleLandSizeChange = (event) => {
        const value = event.target.value == "" ? "" : parseFloat(event.target.value);
        setLandSize(value);
    };
    const handleKwChange = (event) => {
        const value = event.target.value == "" ? "" : parseFloat(event.target.value);
        setKw(value);
    };

    const handleClear = () => {
        setDisSquareMeter("");
        setDisLandSize("");
        setDisKw("");
    };
    useEffect(() => {
        setDisSquareMeter(squareMeter);
        setDisLandSize(squareMeter == "" ? "" : roundToTwo(squareMeter * 0.305));
        setDisKw(squareMeter == "" ? "" : roundToTwo((squareMeter * 0.305) / 1.7));
    }, [squareMeter]);
    useEffect(() => {
        setDisSquareMeter(landSize == "" ? "" : roundToTwo(landSize / 0.305));
        setDisLandSize(landSize);
        setDisKw(landSize == "" ? "" : roundToTwo(landSize / 1.7));
    }, [landSize]);
    useEffect(() => {
        setDisSquareMeter(kw == "" ? "" : roundToTwo((kw * 1.7) / 0.305));
        setDisLandSize(kw == "" ? "" : roundToTwo(kw * 1.7));
        setDisKw(kw);
    }, [kw]);
    return (
        <Container>
            <br />
            <Typography variant="h6" color="textSecondary" align="left">
                坪數計算機
            </Typography>
            <br />
            <Paper>
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <TextField
                                    label="平方公尺"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    onChange={handleSquareMeterChange}
                                    fullWidth
                                    value={disSquareMeter}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <TextField
                                    label="坪數"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    onChange={handleLandSizeChange}
                                    fullWidth
                                    value={disLandSize}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <TextField
                                    label="KW數"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    onChange={handleKwChange}
                                    fullWidth
                                    value={disKw}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <br />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <Button color="primary" variant="contained" fullWidth onClick={handleClear}>
                                    清除
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Calculator;
