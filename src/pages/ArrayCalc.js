import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper, Box, Button, Typography, TextField, Card, CardContent } from "@material-ui/core";

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

const useStyles = makeStyles({
    root: {
        padding: "0",
    },
    title: {
        fontSize: 13,
        marginTop: 0,
        marginButtom: 0,
    },
    content: {
        padding: "10px 12px 0px;",
        paddingBottom: "10px!important",
    },
});

const Calculator = () => {
    const classes = useStyles();
    const [squareMeter, setSquareMeter] = useState("");
    const [landSize, setLandSize] = useState("");
    const [kw, setKw] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [piece, setPiece] = useState("");
    const handleLengthChange = (event) => {
        setLength(event.target.value);
    };
    const handleWidthChange = (event) => {
        setWidth(event.target.value);
    };

    const handleClear = () => {
        setSquareMeter("");
        setLandSize("");
        setKw("");
        setLength("");
        setWidth("");
        setPiece("");
    };

    const getValue = (str) => {
        if (str === "") return "";
        else if (str[str.length - 1] === ".") return str;
        else return parseFloat(str);
    };
    useEffect(() => {
        const l_value = getValue(length);
        const w_value = getValue(width);
        if (typeof l_value === "number" && typeof w_value === "number") {
            if (w_value > l_value) {
                const tmp = length;
                setLength(width);
                setWidth(tmp);
                return;
            }
            setSquareMeter(roundToTwo(l_value * w_value));
            let l_pieces = parseInt(l_value / 1.7);
            if (l_value - l_pieces * 1.7 >= 1) l_pieces += 1;
            let w_pieces = parseInt(w_value);
            if (w_value - w_pieces * 1.7 >= 0.5) w_pieces += 1;
            setPiece((l_pieces * w_pieces).toString() + "(" + l_pieces.toString() + "*" + w_pieces.toString() + ")");
            setKw(roundToTwo((l_pieces * w_pieces) / 3));
        }
    }, [length, width]);
    useEffect(() => {
        setLandSize(squareMeter === "" ? "" : roundToTwo(squareMeter * 0.305));
    }, [squareMeter]);
    return (
        <Container>
            <br />
            <Typography variant="h6" color="textSecondary" align="left">
                排布計算機
            </Typography>
            <br />
            <Paper>
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="40%">
                                <TextField
                                    label="長(公尺)"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    onChange={handleLengthChange}
                                    fullWidth
                                    value={length}
                                />
                            </Box>
                            <Box width="40%">
                                <TextField
                                    label="寬(公尺)"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    onChange={handleWidthChange}
                                    fullWidth
                                    value={width}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%" style={{ padding: 0 }}>
                                <Grid container justifyContent="center">
                                    <Grid item md={6} xs={12}>
                                        <Grid container justifyContent="center">
                                            <Box width="100%" style={{ padding: 0 }}>
                                                <Card className={classes.root} variant="outlined">
                                                    <CardContent className={classes.content}>
                                                        <Typography
                                                            className={classes.title}
                                                            color="textSecondary"
                                                            gutterBottom
                                                        >
                                                            平方公尺
                                                        </Typography>
                                                        <Typography variant="body1" component="p">
                                                            {squareMeter}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Grid container justifyContent="center">
                                            <Box width="100%" style={{ padding: 0 }}>
                                                <Card className={classes.root} variant="outlined">
                                                    <CardContent className={classes.content}>
                                                        <Typography
                                                            className={classes.title}
                                                            color="textSecondary"
                                                            gutterBottom
                                                        >
                                                            坪數
                                                        </Typography>
                                                        <Typography variant="body1" component="p">
                                                            {landSize}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid item md={6} xs={12}>
                                        <Grid container justifyContent="center">
                                            <Box width="100%" style={{ padding: 0 }}>
                                                <Card className={classes.root} variant="outlined">
                                                    <CardContent className={classes.content}>
                                                        <Typography
                                                            className={classes.title}
                                                            color="textSecondary"
                                                            gutterBottom
                                                        >
                                                            總片數
                                                        </Typography>
                                                        <Typography variant="body1" component="p">
                                                            {piece}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Grid container justifyContent="center">
                                            <Box width="100%" style={{ padding: 0 }}>
                                                <Card className={classes.root} variant="outlined">
                                                    <CardContent className={classes.content}>
                                                        <Typography
                                                            className={classes.title}
                                                            color="textSecondary"
                                                            gutterBottom
                                                        >
                                                            KW數
                                                        </Typography>
                                                        <Typography variant="body1" component="p">
                                                            {kw}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
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
