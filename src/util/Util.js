import getSidebarItems from "../data/NavbarItemData.js"

let _util = {
    navbarItems : getSidebarItems()
};

class Util {

    getSidebarItems(){
        return _util.navbarItems;
    }
}

export default new Util();