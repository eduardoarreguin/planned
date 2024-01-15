import { danger, primaryColor } from "./colors";

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
        color: primaryColor,
        fontSize: 30,
        textAlign: 'center',

    },
    textAmount:{
        fontSize: 20,
        fontWeight: '700'
    },
    textDate:{
        fontWeight: '700',
        color: danger
    },
}

export default globalStyles;