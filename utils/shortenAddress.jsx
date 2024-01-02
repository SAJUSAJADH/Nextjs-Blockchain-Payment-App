export const shortenAddress  = (address)  => {

    const firstPart = address.slice(0,5)

    const secondPart = address.slice(address.length - 4)

    return `${firstPart}...${secondPart}`
}