function ise(err, req, res, next) {
    res.status(500).render('500')
}
function pnf(req, res, next) {
    res.status(404).render('404');
}
module.exports = {ise, pnf}