import Colors from "./colors";

const globalStyles = {
    container:{
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderRadius: 10,
        transform: [{translateY: 50}],
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    title:{
        color: Colors.primaryColor,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '600'


    },
    textAmount:{
        fontSize: 20,
        fontWeight: '600'
    },
    textDate:{
        fontWeight: '600',
        color: Colors.pinkLight
    },
    btn:{
        padding: 10,
        marginHorizontal: 10,
        flex: 1,
        alignItems:'center',
        borderRadius: 2
    },
}

export default globalStyles;